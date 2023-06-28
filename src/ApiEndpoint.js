import { API } from 'aws-amplify'

const myAPI = "MCOChatbot"
const path = '/conversation'; 

/**
 * This function interacts with the API for sending the message to the chatbot and retrieving the response
 * @param {string} query 
 * @returns {string} response
 */
export function sendQuery(query) {
  const URL = path + "/" + query;
  return new Promise((resolve, reject) => {
    API.get(myAPI, URL, {})
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject("There was a connection error with the API. Please try again later.");
      });
  });
}