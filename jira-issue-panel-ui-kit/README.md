# Forge Jira Issue Panel

This project contains a Forge app written in TypeScript that displays all bugs linked to a specific issue (task, epic, etc) in a Jira Issue Panel. 

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Environment

The following environment variables are needed for this project:
```
EMAIL={YOUR_EMAIL}
API_TOKEN={YOUR_API_TOKEN}
BASE_URL={YOUR_BASE_URL}
```

For more info how to obtain API token [see here](https://id.atlassian.com/manage-profile/security/api-tokens).
And how to set up a cloud developer site - [here](http://go.atlassian.com/cloud-dev).

## Folder Structure

- **src/frontend** - contains React components for the frontend of the Issue Panel, where `src/frontend/components/BugPanel.tsx` is the main component. It contains a table and it's built using forge/react helper components See [Forge Dynamic Table](https://developer.atlassian.com/platform/forge/ui-kit/components/dynamic-table/) for more info.

- **src/resolvers** - contains logic for calling two endpoints part of the v3 [Atlassian Developer API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/):

```
GET /issue/${issueId}?fields=issuelinks ## fetching data for all issues linked to a specific issue with `issueId`
```
and
```
DELETE /issueLink/${linkId} ## deleting links from an issue by passed `linkId`
```

- **src/utils** - configs and http helpers for making http requests implemented with [axios](https://axios-http.com/docs/intro)

- **test** - unit tests, for now covering the logic only part of `jiraApi.ts` and `http.ts`

## Build and deploy this app by running:
```
forge deploy
```

- Install this app in an Atlassian site by running:
```
forge install
```

- Develop this app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Ideas for future improvements

- Add more unit and automation e2e tests written in [Playwright library] (https://playwright.dev/docs/api/class-playwright)
- Create CI/CD pipeline including the following steps - installing dependencies, building the project, and all Forge commands needed for the full setup of the project
