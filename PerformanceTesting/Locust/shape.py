from locust import LoadTestShape

class StepLoadProfile(LoadTestShape):
    stages = [
        {"duration": 60, "users": 100, "spawn_rate": 20},
        {"duration": 120, "users": 1000, "spawn_rate": 200},
        {"duration": 180, "users": 10000, "spawn_rate": 2000},
    ]

    def tick(self):
        run_time = self.get_run_time()
        for stage in self.stages:
            if run_time < stage["duration"]:
                return stage["users"], stage["spawn_rate"]
        return None
