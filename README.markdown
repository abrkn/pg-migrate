pg-migrate
===

Files in the specified directory are run in sequential order. Each filename has to start
with a number and end with .sql. You can use any number of leading zeroes.

#### Example directory

```
001-initial.sql
002-something else.sql
003.sql
004.sql
```

Usage
---

```
Run PostgreSQL migration scripts.
Usage: pg-migrate -u postgres://postgres@localhost/mydb

Options:
  -u, --url    database url  [required]
  -f, --from   from index    [default: 0]
  -t, --to     to index      [default: 1000]
  -d, --input  directory     [default: cwd]
```

Bugs
---

Each migration script is run in a separate transaction. If a migration fails, the
migration scripts that were run before are not aborted.

The specified directory is not traversed recursively. A recursive option would make
this script more useful for a project with many of migrations.

Tests
---

`npm test`

License
---

MIT
