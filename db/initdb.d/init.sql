-- docker-compose.yamlのみで使用
use movie-db;
CREATE TABLE if not exists `testTable`(
    `id` int(11),
    `name` varchar(30)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE if not exists `itemTable`(
    `user_id` varchar(50),
    `item` varchar(50),
    `todo_flg` int(11),
    PRIMARY KEY (`user_id`, `item`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE if not exists `user_review`(
    `movie_id` varchar(10),
    `username` varchar(50),
    `review_text` text,
    `rating` float(11),
    `id` varchar(50),
    `created_at` datetime,
    `updated_at` datetime,
    `url` varchar(100),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
