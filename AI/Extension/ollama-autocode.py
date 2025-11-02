import os
import argparse
import subprocess

def read_repo_files(repo_path, max_size_kb=100):
    context = []
    for root, _, files in os.walk(repo_path):
        for file in files:
            path = os.path.join(root, file)
            if os.path.getsize(path) <= max_size_kb * 1024:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    context.append(f"\n--- {path} ---\n{content}")
    return "\n".join(context)

def run_ollama(model, prompt):
    result = subprocess.run(
        ["ollama", "run", model],
        input=prompt.encode('utf-8'),
        capture_output=True
    )
    return result.stdout.decode('utf-8')

def main():
    parser = argparse.ArgumentParser(description="Autocode your repo with Ollama")
    parser.add_argument("repo", help="Path to your repo")
    parser.add_argument("--model", default="codellama", help="Ollama model to use")
    parser.add_argument("--task", default="Generate unit tests", help="Task prompt")
    args = parser.parse_args()

    context = read_repo_files(args.repo)
    full_prompt = f"{args.task} based on the following repo:\n{context}"
    output = run_ollama(args.model, full_prompt)
    print(output)

if __name__ == "__main__":
    main()
