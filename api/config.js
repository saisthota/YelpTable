module.exports = {
    getConsumerKey: function() {
        return 'ConsumerKey';
    },

    getToken: function() {
        return 'ConsumerSecret';
    },

    getRequestTime: function() {
        return (new Date).getTime();
    }
}