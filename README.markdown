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

The script will write a file `migrations.json` in the directory to keep track of
which migration scripts have already been run:

```
{
    "localhost/pgm": {
        "current": 3
    }
}
```

The [host and pathname] portions of the database url are used to identify each database.

Install
---

`npm install -g pg-migrate`

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

When `-f` is omitted, it will default to the current number from the `migrations.json` file.
If there is no state stored for the server, `-f` will default to 0.

Bugs/limitations
---

Each migration script is run in a separate transaction. If a migration fails, the
migration scripts that were run before are not aborted.

The specified directory is not traversed recursively. A recursive option would make
this script more useful for a project with hundreds migrations, where it's impractical
to store them all in one directory.

Tests
---

`npm test`

License
---

MIT
