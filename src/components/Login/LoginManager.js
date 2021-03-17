import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

// signin with Google Account
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
}

//Sign in with FB
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            user.success = true;
            return user;
            console.log('facebook sign in status', user);

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });

}

// SignOut
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        })
        .catch((error) => {
            console.log(error);
        });
}

//Create new user with Email and Password firebase
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res);
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;

        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            console.log(error.message);
            return newUserInfo;
            
        });
}


// Sign In existing user with Email and Password firebase 
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            console.log('Signed in user info: ', res.user.displayName, res.user.email);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            console.log('Error', error.message);
            return (newUserInfo);
        });

}

//send user name / info to firebase when using custom sign up 
const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('User Name Updated successful');
    }).catch(function (error) {
        console.log(error);
    });
}


