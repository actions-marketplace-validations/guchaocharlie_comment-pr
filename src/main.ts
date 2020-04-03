import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run() {
  try {
    const repoToken = core.getInput('github-token', {required: true});
    const client = new github.GitHub(repoToken);
    const prNumber = parseInt(github.context.payload.head_commit.message.match(/(?<=#)\d+/g)[0]);

    await addComment(
      client,
      prNumber,
      core.getInput('comment', {required: true})
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function addComment(
  client: github.GitHub,
  prNumber: number,
  comment: string
) {
  await client.pulls.createReview({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: prNumber,
    body: comment,
    event: 'COMMENT'
  });
}

run();
