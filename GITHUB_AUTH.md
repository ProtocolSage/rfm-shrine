# GitHub Authentication Guide

## Method 1: Using a Personal Access Token (PAT)

1. Go to GitHub.com and log in
2. Click on your profile picture > Settings
3. Scroll down to "Developer settings" and click on it
4. Click on "Personal access tokens" and then "Tokens (classic)"
5. Click "Generate new token" and then "Generate new token (classic)"
6. Give your token a descriptive name
7. Select the scopes (permissions) - for repositories, select "repo"
8. Click "Generate token"
9. Copy the token (IMPORTANT: You won't be able to see it again!)

Then use the token to push to GitHub:

```bash
# Set the remote URL with your username
git remote set-url origin https://ProtocolSage@github.com/ProtocolSage/rfm-shrine.git

# When prompted for password, use your personal access token
git push -u origin main
```

## Method 2: Using SSH Keys

1. Check if you have existing SSH keys:
   ```bash
   ls -la ~/.ssh
   ```

2. If no keys exist, generate a new SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. Start the SSH agent:
   ```bash
   eval "$(ssh-agent -s)"
   ```

4. Add your SSH key to the agent:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

5. Copy the SSH public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

6. Add the SSH key to your GitHub account:
   - Go to GitHub.com and log in
   - Click on your profile picture > Settings
   - Click on "SSH and GPG keys"
   - Click "New SSH key"
   - Give your key a title and paste the public key
   - Click "Add SSH key"

7. Change your remote URL to use SSH:
   ```bash
   git remote set-url origin git@github.com:ProtocolSage/rfm-shrine.git
   ```

8. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## Method 3: Using GitHub CLI

1. Install GitHub CLI:
   ```bash
   # For Ubuntu/Debian
   sudo apt install gh
   
   # For Fedora
   sudo dnf install gh
   
   # For macOS
   brew install gh
   ```

2. Authenticate with GitHub:
   ```bash
   gh auth login
   ```

3. Follow the prompts to complete authentication

4. Push to GitHub:
   ```bash
   git push -u origin main
   ```