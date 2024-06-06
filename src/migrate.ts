import {GestionClientApplication} from './application';

export async function migrate(args: string[]): Promise<void> {
  const app = new GestionClientApplication();
  await app.boot();

  // Determine whether to drop or alter existing schema
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log(`Migrating schemas (${existingSchema} existing schema)`);

  // Perform the migration
  await app.migrateSchema({existingSchema});
  console.log('Schema migration completed.');

  await app.stop();
}

if (require.main === module) {
  // Parse command line arguments and run the migration
  const args = process.argv.slice(2);
  migrate(args).catch(err => {
    console.error('Failed to migrate database schema:', err);
    process.exit(1);
  });
}
