const { execSync } = require('child_process');
const fs = require('fs');

// Função para obter o número de commits
function getCommitCount() {
  try {
    const output = execSync('git rev-list --count HEAD').toString().trim();
    return output;
  } catch (error) {
    console.error('Erro ao obter o número de commits:', error);
    return null;
  }
}

// Função para atualizar o BUILD_NUMBER no arquivo .env
function updateEnvFile(buildNumber) {
  const envFilePath = '.env';
  const envContent = fs.readFileSync(envFilePath, 'utf-8');
  const updatedContent = envContent
    .split('\n')
    .map(line => {
      if (line.startsWith('BUILD_NUMBER=')) {
        return `BUILD_NUMBER=${buildNumber}`;
      }
      return line;
    })
    .join('\n');

  fs.writeFileSync(envFilePath, updatedContent, 'utf-8');
  console.log(`BUILD_NUMBER atualizado para: ${buildNumber}`);
}

// Executar as funções
const commitCount = getCommitCount();
if (commitCount !== null) {
  updateEnvFile(commitCount);
}