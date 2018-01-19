module.exports = {
    // Загрузить модель юзера (пользователя)
    // На *nix-ах все файлы чувствительны к регистру
    Users: require('./Users'),
    Artists: require('./Artists'),
    Articles: require('./Articles'),
    Humans: require('./Humans')
};

// Не забудем точку с запЕтой!