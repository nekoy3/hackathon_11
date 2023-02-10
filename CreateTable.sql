-- 地方マスタ
CREATE TABLE areas(
    area_id   CHAR(1) NOT NULL,
    area_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (area_id)
);

-- 都道府県マスタ
CREATE TABLE prefectures(
    prefectures_id   CHAR(2)     NOT NULL,
    area_id          CHAR(1)     NOT NULL,
    prefectures_name VARCHAR(5)  NOT NULL,
    latitude         DOUBLE(7,7) NOT NULL,
    longitude        DOUBLE(7,7) NOT NULL,
    label            VARCHAR(200) NOT NULL,
    charm_rank       INTEGER(2)   NOT NULL,
    PRIMARY KEY (prefectures_id),
    FOREIGN KEY (area_id)      REFERENCES   areas(area_id)
);