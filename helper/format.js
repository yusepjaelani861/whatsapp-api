function numberWAFormat(chatId) {
    if (chatId.includes('@c.us')) {
        return chatId.replace('@c.us', '');
    } else if (chatId.includes('@s.whatsapp.net')) {
        return chatId.replace('@s.whatsapp.net', '');
    } else if (chatId.includes('@g.us')) {
        return chatId.replace('@g.us', '');
    }
}

function formatDate(date) {
    // YYYY-MM-DD HH:MM:SS
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

module.exports = {
    numberWAFormat,
    formatDate
}