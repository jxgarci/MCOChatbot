# Microsoft Cost Optimization Chatbot
This project author is: Jxgarci

## Infrastructure Explanation
AWS services used in the project:

### Amplify
Provides the front end and enables the connection between front and back end using API gateway. These directory was generated using amplify CLI commands.
Core folders:
- src: contains all the front-end components and logic.
- amplify: manages the back-end.

### API gateway
Enables the connection between front and back end. Uses POST requests containing the user input in order to interact with the chat bot.

### Lex
This service works as the core of the chat bot. Contains intents for the different microsoft services and interprets what the user is saying.

### Kendra
Part of the reference engine, it receives a user query and returns several results that match the query.

### SageMaker: HuggingFace summarization bart-large-cnn-samsum model
Part of the reference engine, it receives an input text and returns a summary of it.

### Lambda
Several functions used to manage:
- The connection from the API to the backend  (mcochatbotConvHandler).
- The Lex validation and calls to the reference engine (LexHelperFunction).
- The reference engine logic (referenceEngineHandler).
