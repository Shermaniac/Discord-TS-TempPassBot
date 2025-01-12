# TeamSpeak Temporary Password Generator

This project provides a Discord bot that generates temporary passwords for your TeamSpeak server when a command is used. The bot uses Discord's slash commands to interact with users and generates a temporary password that expires after a specified duration on the TeamSpeak server. I created this back in February 2024 for use by recruitment staff and administrators in New Justice Roleplay, a FiveM community, which has since closed its doors and is no longer operating. In January of 2025, I found the source code for this project on an old hard drive of mine and decided to apply some much needed quality of life edits (such as adding support for discord roles, adding a .env for simple configuration [everything used to be hardcoded lmfao], and much more). I then decided to publish it for anyone to download for their own usage as they'd wish.

When I first started my community, I was looking for a bot like this as I had seen it in 2 larger communities I was once a part of. They said they coded their bot on their own. I was never able to find anything like this on Github or anywhere else on the internet for public download, so I learned some very basic programming in TeamSpeak 3 and made it myself. Here it is!

#### NOTICE:
I will NOT provide support for this resource. If you'd like to contribute to this project, feel free to contribute for contribution credits by creating a pull request for my review.

## Features

- Generates a random temporary password for a TeamSpeak server.
- Password is valid for a specified duration.
- Role-based access control for executing commands.
- Simple integration with TeamSpeak and Discord API.

## Requirements

- Node.js (version 16.x or higher recommended)
- TeamSpeak server with server admin query access
- Discord bot


## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
```npm install```
3. Edit the `.env` file at the root of the project to configure your bot.
4. Run the bot:
```npm start```
5. Enjoy this free service.

## Usage
Once the bot is up and running, use the `/generate-temporary-password` command to generate a random temporary password. The password will be valid for the duration specified in the .env file.
Role Enforcement

If the environment variable `D_ENFORCE_ROLES` is set to `Yes`, users must have the role specified in `D_ALLOWED_ROLE_ID` to execute the command. If they don't have the role, they will receive an error message.

# Contributing

    1. Fork the repository.
    2. Create a new branch (git checkout -b feature-branch).
    3. Make your changes.
    4. Commit your changes (git commit -am 'Add new feature').
    5. Push to the branch (git push origin feature-branch).
    6. Create a new Pull Request.

# License Information
This project is licensed under the MIT License. See the LICENSE file for more information.

# Thank you!

Thank you for downloading my first public project. My name is Shermaniac and I hope to see you thriving using my resource very soon. Best of luck to you!
