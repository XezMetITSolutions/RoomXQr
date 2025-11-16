const { execSync } = require('child_process');

console.log('🔄 Migration çalıştırılıyor...');

try {
  const output = execSync('npx prisma migrate deploy', {
    encoding: 'utf8',
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('✅ Migration başarıyla çalıştırıldı');
  console.log(output);
} catch (error) {
  console.error('❌ Migration hatası:', error.message);
  if (error.stdout) console.log('stdout:', error.stdout);
  if (error.stderr) console.error('stderr:', error.stderr);
  process.exit(1);
}

