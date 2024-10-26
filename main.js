class CbtPlugin extends Plugin {
  async onload() {
    console.log('CBT Plugin loaded');  // Отладочное сообщение при загрузке плагина
    
    try {
      this.addCommand({
        id: 'create-cbt-session',
        name: 'Create CBT Session',
        callback: () => this.createCbtSession()
      });
    } catch (error) {
      console.error("Error adding command:", error);  // Логирование ошибки добавления команды
    }
  }

  async createCbtSession() {
    const folderPath = 'КПТ СЕССИИ';
    const fileName = `КПТ_${new Date().toLocaleDateString()}.md`;
    
    const template = `
---
tags:
  - КПТ
---

## 1. Ситуация:
Опишите ситуацию, в которой возникает страх.

## 2. Автоматическая мысль:
Какая мысль первой возникла в голове?

## 3. Эмоции:
Какие эмоции возникли? Оцените их по шкале от 0 до 10.

## 4. Физические ощущения:
Какие физические ощущения вы испытали?

## 5. Когнитивное искажение:
Есть ли когнитивное искажение (например, катастрофизация, чтение мыслей)?

## 6. Доказательства "за":
Какие факты подтверждают автоматическую мысль?

## 7. Доказательства "против":
Какие факты опровергают автоматическую мысль?

## 8. Альтернативная мысль:
Какую более конструктивную мысль можно использовать вместо негативной?

## 9. План действий:
Что можно сделать в следующий раз?
`;

    try {
      const folderExists = await this.app.vault.adapter.exists(folderPath);
      if (!folderExists) {
        console.log("Creating folder:", folderPath);
        await this.app.vault.createFolder(folderPath);
      }

      const filePath = `${folderPath}/${fileName}`;
      console.log("Creating file at path:", filePath);
      await this.app.vault.create(filePath, template);
      new Notice(`CBT session created: ${filePath}`);
    } catch (error) {
      console.error("Error creating session:", error);  // Логирование ошибки создания файла или папки
    }
  }
}

module.exports = CbtPlugin;