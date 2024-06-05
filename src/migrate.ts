import {GestionClientApplication} from './application';

export async function migrate(args: string[]) {
  // Determine whether to drop or alter existing schema
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  // Initialize the application
  const app = new GestionClientApplication();

  try {
    // Boot the application
    await app.boot();

    // Migrate the schema
    await app.migrateSchema({ existingSchema });

    console.log('Schema migration successful');
  } catch (err) {
    // Log and handle errors
    console.error('Cannot migrate database schema', err);
    process.exit(1);
  }

  // Explicitly exit the process
  process.exit(0);
}

// Execute the migration script
migrate(process.argv).catch(err => {
  console.error('Unhandled error during migration', err);
  process.exit(1);
});
