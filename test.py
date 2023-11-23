# two protocols: one for daily messages, one for live messages
# daily messages: 1. get the data from the database
#                 2. format the data into a message
#                 format: 
#                     {
#                         "type": "daily",
#                         "data": {
#                             "date": "2020-01-01",
#                             "hash": "1234567890abcdef",
#                             "message": "Hello World!"
#                         }
#                     }
#                 3. update endpoint at midnight

# live messages: 1. get message from endpoint call
#                2. format the data into a message
#                format:
#                    {
#                        "type": "live",
#                        "data": {
#                            "hash": "1234567890abcdef",
#                            "message": "Hello World!"
#                        }
#                    }
#                3. update endpoint every 5 minutes

