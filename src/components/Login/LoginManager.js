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
                photo: photoURL
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
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
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

//Create new user with firebase
// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then(res => {
//             console.log(res);
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             updateUserName(user.name);

//         })
//         .catch(error => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             console.log(error.message);
//             setUser(newUserInfo);
//         });
// }


// // Sign In existing user with firebase

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then(res => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             setLoggedInUser(newUserInfo);
//             history.replace(from);
//             console.log('Signed in user info: ', res.user.displayName, res.user.email);

//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//             console.log('Error', error.message);
//         });

// }

// //send user name / info to firebase when using custom sign up 
// const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//         displayName: name
//     }).then(function () {
//         console.log('User Name Updated successful');
//     }).catch(function (error) {
//         console.log(error);
//     });
// }


