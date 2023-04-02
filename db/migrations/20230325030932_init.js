/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// ------------------COMMANDS---------------------
// npx knex migrate:latest --knexfile db/knexfile.js
//                      OR
// npm run migrate

// checks database for all migrations that have and haven't been run, 
// then runs them if they haven't been ran yet.
// ***NOTE: Need to delete knex_migrations and knex_migrations_lock tables before your migration works properly
// -----------------------------------------------

exports.up = function (knex) {
    // create the user schema
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').defaultTo(knex.raw("gen_random_uuid()")).unique();
        table.string('email_address').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password_hash').notNullable();
        table.string('first_name');
        table.string('last_name');
        table.date('date_of_birth');
        table.string('bio');
        table.string('pfp');
        table.integer('post_count').defaultTo(0);
        table.specificType('following', 'text[]');  // might need to swap the type from text[] to uuid
        table.specificType('saved_lst', 'text[]');
        table.timestamps(true, true);
    }).createTable('posts', (table) => {
        table.enum('type', ['friends', 'community']).notNullable();
        table.uuid('post_id').defaultTo(knex.raw("gen_random_uuid()")).notNullable();
        table.uuid('posted_by').references('id').inTable('users');
        table.string('img_link').defaultTo(null);
        table.string('topic');
        table.string('title').notNullable();
        table.string('body_text');
        table.specificType('likes_lst', 'text[]');
        table.specificType('dislikes_lst', 'text[]');
        table.specificType('comments_lst', 'text[]');  // stores the unique uuid of a comment
        table.datetime('posted_at').notNullable();  // when the post was made
        table.timestamps(true, true);
    }).createTable('comments', (table) => {
        table.uuid('comment_id').defaultTo(knex.raw("gen_random_uuid()")).notNullable();
        table.uuid('posted_by').references('id').inTable('users');
        table.string('body_text').notNullable();
        table.specificType('likes_lst', 'text[]');
        table.specificType('dislikes_lst', 'text[]');
        table.specificType('comments_lst', 'text[]');  // stores the unique uuid of a reply comment
        table.dateTime('posted_at').notNullable();  // when the comment was made
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('comment').dropTable('post').dropTable('users');
};
