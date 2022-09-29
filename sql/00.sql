CREATE TABLE task_status (
    id INT GENERATED ALWAYS AS IDENTITY,
    status_name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE tasks (
    id INT GENERATED ALWAYS AS IDENTITY,
    task_title VARCHAR(255) NOT NULL,
    task_description VARCHAR(255) NOT NULL,
    task_status_id INT,
    PRIMARY KEY(id),
    CONSTRAINT fk_task_status_id
        FOREIGN KEY(task_status_id)
            REFERENCES task_status(id)
);

CREATE TABLE audit_log (
    id INT GENERATED ALWAYS AS IDENTITY,
    message VARCHAR (255),
    location VARCHAR(255),
    created_at TIMESTAMP,
    severity VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
