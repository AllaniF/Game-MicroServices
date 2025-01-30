CREATE TABLE IF NOT EXISTS map (
                                   id SERIAL PRIMARY KEY,
                                   matrix JSONB NOT NULL  -- Use JSONB for efficient storage and querying
);

INSERT INTO map (matrix)
VALUES (
           '{
               "matrix": [
           ["E", "E", "B", "B", "B", "B", "B", "B", "B", "B"],
           ["B", "E", "E", "E", "B", "E", "E", "E", "E", "B"],
           ["B", "B", "B", "E", "B", "E", "B", "B", "E", "B"],
           ["B", "E", "B", "E", "B", "E", "B", "E", "E", "B"],
           ["B", "E", "B", "E", "B", "B", "B", "B", "E", "B"],
           ["B", "E", "E", "E", "E", "E", "E", "B", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "E", "B", "E", "B"],
           ["B", "E", "E", "E", "E", "B", "E", "B", "E", "B"],
           ["B", "B", "B", "B", "E", "B", "E", "E", "E", "B"],
           ["B", "B", "B", "B", "E", "E", "E", "B", "E", "F"]
       ]
           }'::jsonb -- Explicitly cast to jsonb
       );

INSERT INTO map (matrix)
VALUES (
           '{
               "matrix":  [
           ["E", "E", "B", "B", "B", "B", "B", "B", "B", "B"],
           ["B", "E", "E", "E", "E", "E", "E", "E", "E", "B"],
           ["B", "B", "B", "B", "B", "E", "B", "B", "E", "B"],
           ["B", "E", "E", "E", "B", "E", "E", "B", "E", "B"],
           ["B", "E", "B", "E", "B", "B", "E", "B", "E", "B"],
           ["B", "E", "B", "E", "E", "E", "E", "B", "E", "B"],
           ["B", "E", "B", "B", "B", "B", "B", "B", "E", "B"],
           ["B", "E", "E", "E", "E", "E", "E", "E", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "B", "B", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "B", "B", "E", "F"]
       ]
           }'::jsonb -- Explicitly cast to jsonb
       );

INSERT INTO map (matrix)
VALUES (
           '{
               "matrix":  [
           ["E", "E", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
           ["B", "E", "E", "E", "E", "E", "E", "B", "E", "E", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "E", "B", "B", "B", "E", "B"],
           ["B", "E", "E", "E", "B", "E", "E", "E", "E", "B", "E", "B"],
           ["B", "E", "B", "E", "B", "E", "B", "B", "E", "B", "E", "B"],
           ["B", "E", "B", "E", "E", "E", "E", "B", "E", "B", "E", "B"],
           ["B", "E", "B", "B", "E", "B", "E", "B", "E", "B", "E", "B"],
           ["B", "E", "E", "E", "E", "B", "E", "E", "E", "B", "E", "B"],
           ["B", "B", "B", "B", "E", "B", "B", "B", "B", "B", "E", "B"],
           ["B", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "E", "F"]
       ]

           }'::jsonb -- Explicitly cast to jsonb
       );


INSERT INTO map (matrix)
VALUES (
           '{
               "matrix":  [
           ["E", "E", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"],
           ["B", "E", "E", "E", "E", "E", "E", "B", "E", "E", "E", "B"],
           ["B", "E", "B", "B", "B", "E", "B", "B", "B", "B", "E", "B"],
           ["B", "E", "E", "E", "B", "E", "E", "E", "E", "B", "E", "B"],
           ["B", "E", "B", "E", "B", "B", "B", "B", "E", "B", "E", "B"],
           ["B", "E", "B", "E", "E", "E", "E", "B", "E", "E", "E", "B"],
           ["B", "E", "B", "B", "B", "B", "E", "B", "B", "B", "E", "B"],
           ["B", "E", "E", "E", "E", "B", "E", "E", "E", "B", "E", "B"],
           ["B", "B", "B", "B", "E", "B", "B", "B", "E", "B", "B", "B"],
           ["B", "E", "E", "E", "E", "E", "E", "B", "E", "E", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "E", "B", "B", "B", "E", "B"],
           ["B", "B", "B", "B", "B", "B", "E", "E", "E", "E", "E", "F"]
       ]

           }'::jsonb -- Explicitly cast to jsonb
       );
