# coding:utf-8
from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import logging, json
from urllib import request
from datetime import datetime

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# ログファイルハンドラ
fh = logging.FileHandler("application.log")
fh.setLevel(logging.INFO)

# ログフォーマット
formatter = logging.Formatter(
    "%(asctime)s %(levelname)s %(filename)s %(lineno)d %(message)s"
)
fh.setFormatter(formatter)

logger.addHandler(fh)

import mysql.connector

app = Flask(__name__)
CORS(app, supports_credentials=True)  # CORS 対策
app.config.from_json("development.json", True)


@app.route("/")
def hello_world():
    return "hello world!"


@app.route("/test", methods=["GET"])
def test():
    return "Test OK!", 404


def getConnection():
    return mysql.connector.connect(
        host=app.config["DBHOST"],
        db=app.config["DBNAME"],
        user=app.config["DBUSER"],
        passwd=app.config["DBPASS"],
        charset=app.config["DBCHARSET"],
    )


def db_text_save(sql):
    connector = getConnection()
    cursor = connector.cursor()
    cursor.execute(sql)
    connector.commit()
    cursor.close()
    connector.close()


def db_text_select(sql):
    connector = getConnection()
    cursor = connector.cursor()
    cursor.execute(sql)
    text = cursor.fetchall()
    cursor.close()
    connector.close()
    return text


def trim_text(text):
    return


@app.route("/db")
def db_save():
    connector = getConnection()
    cursor = connector.cursor()
    sql = u"insert into testTable values('1','Data inserted')"
    cursor.execute(sql)
    connector.commit()
    cursor.close()
    connector.close()
    return "DB saved!"


@app.route("/reviews/<int:movie_id>")
def get_review(movie_id):

    select_sql = (
        u"select id,review_text,movie_id,username,rating from user_review where movie_id = '"
        + str(movie_id)
        + "'"
    )
    # print(select_sql)
    reviews_in_db = db_text_select(select_sql)
    reviews_in_db = [
        {
            "id": i[0],
            "content": i[1],
            "movie_id": i[2],
            "username": i[3],
            "rating": i[4],
        }
        for i in reviews_in_db
    ]
    print("reviews_in_db: ", json.dumps(reviews_in_db), len(reviews_in_db))

    if len(reviews_in_db) > 0:
        return json.dumps({"results": reviews_in_db})

    review_url = (
        app.config["IMDB_API_HOST"]
        + "/3/movie/"
        + str(movie_id)
        + "/reviews?api_key="
        + app.config["IMDB_API_KEY"]
    )

    print("we will call following URL")
    print(review_url)
    response = request.urlopen(review_url)
    data = response.read()
    dict_data = json.loads(data)
    print(dict_data)

    for result in dict_data["results"]:
        send_sql = (
            u"INSERT INTO user_review(movie_id, username,review_text, rating, id, created_at, updated_at, url) VALUES('"
            + str(movie_id)
            + "','"
            + result["author_details"]["username"]
            + "',%s,'"
            + str(result["author_details"]["rating"])
            + "','"
            + result["id"]
            + "','"
            + datetime.strptime(
                result["created_at"].split(".")[0], "%Y-%m-%dT%H:%M:%S"
            ).strftime("%Y-%m-%d %H:%M:%S")
            + "','"
            + datetime.strptime(
                result["updated_at"].split(".")[0], "%Y-%m-%dT%H:%M:%S"
            ).strftime("%Y-%m-%d %H:%M:%S")
            + "','"
            + result["url"]
            + "')"
        )
        print(send_sql)
        print(result["content"])
        connector = getConnection()
        cursor = connector.cursor()
        cursor.execute(send_sql, (result["content"],))
        connector.commit()
        cursor.close()
        connector.close()
    return data
    # dict = json.loads(data)

    # return render_template("movies.html", movies=dict["results"])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
