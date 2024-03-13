# cloud-data-modeling
Web application for creating and maintaining data models.

## Secret files

Some files contain secret information like API key or credentials. These files are stored in the folder */src/secrets*.
For obvious reasons are these file not part if the Git repository and must be created manually before running the web
application.

Currently, the following secret files are needed.

### Firebase Configuration
*/src/secrets/firebase.json*

```javascript
export const firebaseConfig = {
  apiKey: "<your API key>",
  authDomain: "<your authentication domain>",
  projectId: "<your project id>",
  storageBucket: "<your storage bucket>",
  messagingSenderId: "<your messaging sender id>",
  appId: "<your applicaiton id>",
  measurementId: "<your measurement id>"
};
```
