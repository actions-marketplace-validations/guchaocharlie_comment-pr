# Communicate on pull request merged

```yaml
steps:
- uses: guchaocharlie/comment-pr@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    comment: "Test"
```
