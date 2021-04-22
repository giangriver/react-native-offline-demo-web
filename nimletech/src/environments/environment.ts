// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls: {
     //   api: 'http://ec2-54-169-244-15.ap-southeast-1.compute.amazonaws.com:8006/api/v1',
   api: 'http://localhost:8006/demo/api/v1'
  },
  default_page_size: 20,
  default_user_logo: 'https://ucarecdn.com//8975f6fd-a5c4-464e-ab42-e17d64848db5/User.png'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
