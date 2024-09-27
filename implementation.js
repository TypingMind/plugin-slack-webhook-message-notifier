const GENERAL_ERROR_MESSAGE = "I cannot do that..."
async function send_message_to_slack_channel_with_webhook(params, userSettings) {
    const { message } = params;
    const { slackWebhookUrl } = userSettings;
    if (!slackWebhookUrl) {
        return GENERAL_ERROR_MESSAGE;
    }

    const payload = {
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'plain_text',
                    text: message,
                    emoji: true,
                },
            },
        ],
    };

    try {
        const response = await fetch(slackWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            return "Message has been sent to Slack.";
        } else {
            return GENERAL_ERROR_MESSAGE;
        }
    } catch (error) {
        console.error("Error sending message to Slack:", error);
        return GENERAL_ERROR_MESSAGE;
    }
}