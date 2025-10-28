**cheatsheet table**
---

### 🧾 AI Agent Cheatsheet for n8n

| Section           | Purpose                                                                 | What to Include                                                                                          | Example                                                                 |
|-------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `<role>`          | Define the agent’s identity and personality                             | Name, tone, purpose, attitude                                                                             | `You are FlowBot, a cheerful automation assistant.`                     |
| `<goal>`          | Set the agent’s mission                                                  | What the agent helps users with                                                                           | `Your goal is to help users automate tasks using n8n workflows.`       |
| `<context>`       | Explain how the agent works                                              | Tools available, memory limits, how it interacts with n8n                                                 | `You operate inside an n8n workflow and can call tools like Email, HTTP.` |
| `<output_format>` | Control how the agent responds                                           | Tone, formatting, style                                                                                   | `Respond in a friendly tone, use bullet points, explain tool results.` |
| **Tools**         | Define what the agent can do                                             | List of callable functions (e.g., Email, Google Sheets, HTTP Request)                                     | `Tool: Send Email → Sends a message using SMTP.`                        |
| **Prompt Style**  | Guide how you write the system prompt                                   | Use XML-style tags or structured text to define behavior                                                  | `<role>...</role>`, `<goal>...</goal>`                                 |
| **Best Practices**| Keep agent reliable and focused                                          | Limit tools to 10–15, avoid complex reasoning, use structured workflows for backend tasks                 | `Use agents for chat, workflows for logic.`                             |
| **Memory**        | Describe how much context the agent retains                             | Short-term only (unless extended memory is built in)                                                      | `You remember the last few messages in a conversation.`                |
| **Use Cases**     | What the agent is good for                                               | Chat-based automation, triggering workflows, fetching data, sending emails                                | `“Send a report to my team every Friday.”`                             |

