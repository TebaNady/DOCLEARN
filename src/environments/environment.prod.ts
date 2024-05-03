// export const environment = {
//   production: false,
//   stripePublishableKey: 'pk_test_51OiEubE2Rb4TYvc4Nx4o7CK5cwdTLH51hEAyaZNg5wpJzu5oZZXkkoksQ5D7eUu4rsrXldnYQb0tOKA8kiEaL7xy005qQeBvQ9'
// };

// environment.ts

export interface Environment {
  production: boolean;
  backEndUrl: string;
  // Add other properties if any
}

export const environment: Environment = {
  production: true,
  backEndUrl: "https://doclearn-backend.onrender.com"
};
