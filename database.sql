create table "user" (
    id uuid not null,
    login varchar(25) unique not null,
    password text not null, -- the hash of private key
    pub_key text not null,
    created_at timestamptz not null,
    is_deleted boolean not null,
    primary key (id)
);

create table chat (
    id uuid not null,
    alice uuid not null references "user"(id),
    bob uuid not null references "user"(id),
    created_at timestamptz not null,
    is_deleted boolean not null,
    primary key (id)
);

create table msg (
    id uuid not null,
    chat_id uuid not null references chat(id),
    body text not null,
    sender uuid not null references "user"(id),
    created_at timestamptz not null,
    is_deleted boolean not null,
    primary key (id)
);