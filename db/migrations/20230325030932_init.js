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

exports.up = async function (knex) {
    // create the user schema
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').defaultTo(knex.raw("gen_random_uuid()")).unique().primary();
        table.string('email_address').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password_hash').notNullable();
        table.string('first_name');
        table.string('last_name');
        table.date('date_of_birth');
        table.string('bio');
        table.string('pfp');
        table.integer('post_count').defaultTo(0);
        table.specificType('following', 'text[]').defaultTo("{}");  // might need to swap the type from text[] to uuid
        table.specificType('saved_lst', 'text[]').defaultTo("{}");
        table.specificType('interests_lst', 'text[]').defaultTo("{}");
        table.boolean('is_admin').defaultTo(false);
        table.string('award');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('posts', (table) => {
        table.enum('type', ['friends', 'community']).notNullable();
        table.uuid('post_id').defaultTo(knex.raw("gen_random_uuid()")).unique().primary();

        table.uuid('posted_by');
        table.foreign('posted_by').references('users.id');

        table.string('img_link').defaultTo(null);
        table.string('topic');
        table.string('title').notNullable();
        table.string('body_text');
        table.specificType('likes_lst', 'text[]').defaultTo("{}");
        table.specificType('dislikes_lst', 'text[]').defaultTo("{}");
        table.specificType('comments_lst', 'text[]').defaultTo("{}");  // stores the unique uuid of a comment

        table.boolean('is_event').defaultTo(false);
        table.string('event_winner');                          // who wins the prize
        table.string('event_prize');                          // img link to ribbon
        table.integer('likes_criteria').defaultTo(100);       // once criteria is filled dish out event prize
        table.timestamps(true, true);
    });

    await knex.schema.createTable('comments', (table) => {
        table.uuid('comment_id').defaultTo(knex.raw("gen_random_uuid()")).unique().primary();

        table.uuid('posted_by');
        table.foreign('posted_by').references('users.id');

        table.string('body_text').notNullable();
        table.specificType('likes_lst', 'text[]').defaultTo("{}");
        table.specificType('dislikes_lst', 'text[]').defaultTo("{}");
        table.specificType('comments_lst', 'text[]').defaultTo("{}");  // stores the unique uuid of a reply comment
        table.enum('replying_to_type', ['posts', 'comments']);
        table.timestamps(true, true);
    });

    await knex.schema.createTable('messages', (table) => {
        table.uuid('message_id').defaultTo(knex.raw("gen_random_uuid()")).unique().primary();

        table.uuid('sender_id');
        table.foreign('sender_id').references('users.id');

        table.specificType('receiver_lst', 'text[]').defaultTo("{}");
        table.string('body_text').notNullable();
        table.string('img_link').defaultTo(null);
        table.timestamps(true, true);
    });

    await knex.schema.createTable('chats', (table) => {
        table.enum('type', ['private', 'group']).notNullable();

        table.uuid('group_id').defaultTo(knex.raw("gen_random_uuid()")).unique().primary();
        table.specificType('message_lst', 'text[]').defaultTo("{}");

        table.string('group_name').notNullable();   // only available for group type
        table.uuid('group_admin').notNullable();    // whoever created the group can remove members
        table.specificType('members_lst', 'text[]').defaultTo("{}");    // who has access to the group
        table.timestamps(true, true);

    });

    await knex.schema.createTable('interests', (table) => {
        table.string('interest_name').unique().notNullable();
        table.specificType('posts_lst', 'text[]').defaultTo("{}");
    });

    // await knex.schema.createTable('events', (table) => {
    //     table.uuid('interest_name').unique().notNullable();    // what topic does is this event for
    //     table.string('event_post');                            // uuid of a post advertising the event
    //     table.string('event_name');                            // specific name of event
    //     table.string('event_winner');                          // who wins the prize
    //     table.string('event_prize');                          // img link to ribbon
    //     table.dateTime('duration');                             // how long the event lasts
    //     table.timestamps(true, true);
    // });

    await knex.schema.createTable('notifications', (table) => {
        table.uuid('user_id').references('users.id');    // references your own user
        table.uuid('sender_id');                         // WHO is liking your post
        table.string('body_text');                       // User IS DOING WHAT?
        table.timestamps(true, true);                    // who wins the prize
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('notifications');
    await knex.schema.dropTable('interests');
    await knex.schema.dropTable('chats');
    await knex.schema.dropTable('messages');
    await knex.schema.dropTable('comments');
    await knex.schema.dropTable('posts');
    await knex.schema.dropTable('users');
};
