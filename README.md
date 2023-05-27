# Faceless

Faceless is an anonymous messaging app built using Next.js, Tailwind CSS, and Firebase. It allows users to communicate with each other without revealing their identities, promoting free expression and open conversations.

## Features

-   **Personal Link Sharing**: Registered users can share their personal link to receive messages.
-   **Anonymous Message Sending**: Public users can send messages anonymously to registered users.
-   **Received Message Viewing**: Registered users can view the messages they have received.
-   **Message Deletion**: Registered users can delete messages they have received.

## Technologies Used

-   Next.js for the Javascript framework
-   Tailwind CSS for the CSS framework
-   Redux for state management
-   Firebase for authentication and database

## Prerequisites

Before running the Faceless app locally, ensure that you have the following installed on your machine:

-   Node.js: [https://nodejs.org](https://nodejs.org)
-   Yarn: [https://yarnpkg.com](https://yarnpkg.com)

## Getting Started

Follow these instructions to get a local copy of the Faceless app up and running on your machine.

1. Clone the repository:

    ```
    git clone https://github.com/LeonardTarigan/faceless.git
    ```

2. Navigate to the project directory:

    ```
    cd faceless
    ```

3. Install the dependencies:

    ```
    yarn install
    ```

4. Set up Firebase:

    - Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com/).
    - Enable the **Authentication** and **Firestore** services in your project.
    - Go to **Project Settings** > **General** and copy the Firebase configuration object.
    - Create a new file named `.env` in the project root directory.
    - Paste the Firebase configuration into the `.env` file using the following format:

        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
        ```

5. Start the development server:
    ```
    yarn dev
    ```
6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

To deploy the Faceless app to a hosting platform, follow the deployment instructions specific to your chosen provider. Here are some general steps to get you started:

1. Build the project:
2. Deploy the project to your preferred hosting platform using the build output.

## Contributing

Contributions are welcome! If you'd like to contribute to the Faceless app, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-new-feature`.
3. Make your changes and test them thoroughly.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push the branch to your forked repository: `git push origin my-new-feature`.
6. Open a pull request against the `main` branch of the original repository.

Please ensure that your code adheres to the existing coding style and conventions.
