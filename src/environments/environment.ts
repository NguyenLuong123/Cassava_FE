// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: 'AIzaSyCRsYGoil2n_v5i1_YIe9Dnl9ZCr5nx3uM',
        authDomain: 'testfield-db.firebaseapp.com',
        databaseURL: 'https://testfield-db-default-rtdb.firebaseio.com',
        projectId: 'testfield-db',
        storageBucket: 'testfield-db.appspot.com',
        messagingSenderId: '247118790777',
        appId: '1:247118790777:web:59c1eab2f3e32dc77ad4a8'
    }
};
