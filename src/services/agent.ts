import { agentPrefixUrl, request } from '.';

export const agentService = {
  async sendEmail({ subject, html }: { subject: string; html: string }) {
    const TOKEN = 'app-dVXIHw2wXnyCaL7JazYvkH55';

    const params = {
      inputs: {
        subject,
        html,
        receiver: 'youcai@ciicsh.com',
      },
      user: 'exyc',
    };

    await request.post(
      agentPrefixUrl('/v1/workflows/run'),
      { ...params },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  },
};
