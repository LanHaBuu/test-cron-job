module.exports = {
  async headers() {
    return [
      {
        source: "/api/cron-average",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://test-cron-job-mu.vercel.app"
          }
        ]
      }
    ];
  },
  middleware: true,
};
