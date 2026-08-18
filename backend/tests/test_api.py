import json
import urllib.request
import urllib.error


BASE_URL = "http://127.0.0.1:5000"


def request(method, endpoint, data=None):

    url = BASE_URL + endpoint

    headers = {
        "Content-Type": "application/json"
    }

    body = None

    if data is not None:
        body = json.dumps(data).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=body,
        headers=headers,
        method=method
    )

    try:

        with urllib.request.urlopen(req, timeout=10) as response:

            status = response.status

            response_data = response.read().decode(
                "utf-8"
            )

            try:
                response_json = json.loads(
                    response_data
                )
            except json.JSONDecodeError:
                response_json = response_data

            return status, response_json

    except urllib.error.HTTPError as error:

        response_data = error.read().decode(
            "utf-8"
        )

        try:
            response_json = json.loads(
                response_data
            )
        except json.JSONDecodeError:
            response_json = response_data

        return error.code, response_json

    except Exception as error:

        return None, str(error)


def test_home():

    status, data = request(
        "GET",
        "/"
    )

    assert status == 200

    assert data["status"] == "success"

    print("PASS: Home API")


def test_dashboard():

    status, data = request(
        "GET",
        "/dashboard-stats"
    )

    assert status == 200

    assert "total_predictions" in data
    assert "average_confidence" in data
    assert "chart_data" in data
    assert "trend_data" in data

    print("PASS: Dashboard API")


def test_inventory():

    status, data = request(
        "GET",
        "/inventory"
    )

    assert status == 200

    assert isinstance(data, list)

    print("PASS: Inventory GET API")


def test_inventory_stats():

    status, data = request(
        "GET",
        "/inventory-stats"
    )

    assert status == 200

    assert "total_inventory" in data
    assert "fabric_chart" in data
    assert "source_chart" in data
    assert "quantity_chart" in data

    print("PASS: Inventory Analytics API")


def test_history():

    status, data = request(
        "GET",
        "/history"
    )

    assert status == 200

    assert isinstance(data, list)

    print("PASS: History API")


def test_notifications():

    status, data = request(
        "GET",
        "/notifications"
    )

    assert status == 200

    assert isinstance(data, list)

    print("PASS: Notifications API")


def test_sustainability():

    status, data = request(
        "POST",
        "/sustainability-report",
        {
            "fabric_type": "Cotton",
            "quantity": 10,
            "condition": "Good"
        }
    )

    assert status == 200

    assert "environmental_impact" in data
    assert "sustainability" in data
    assert "circularity" in data

    print("PASS: Sustainability API")


def test_circularity():

    status, data = request(
        "POST",
        "/circularity-analysis",
        {
            "fabric_type": "Cotton",
            "quantity": 10,
            "condition": "Good"
        }
    )

    assert status == 200

    assert "environmental_impact" in data
    assert "circularity" in data

    print("PASS: Circularity API")


def test_recommendations():

    status, data = request(
        "POST",
        "/recommendations",
        {
            "fabric_type": "Cotton",
            "condition": "Good",
            "defect": "defect free"
        }
    )

    assert status == 200

    assert "recommendations" in data
    assert "impact" in data

    print("PASS: Recommendations API")


def run_all_tests():

    print()
    print("=" * 60)
    print("TEXTILE WASTE MANAGEMENT API TESTING")
    print("=" * 60)
    print()

    tests = [
        test_home,
        test_dashboard,
        test_inventory,
        test_inventory_stats,
        test_history,
        test_notifications,
        test_sustainability,
        test_circularity,
        test_recommendations
    ]

    passed = 0
    failed = 0

    for test in tests:

        try:

            test()
            passed += 1

        except Exception as error:

            failed += 1

            print(
                f"FAIL: {test.__name__}"
            )

            print(
                "Reason:",
                error
            )

    print()
    print("=" * 60)
    print(
        f"RESULT: {passed} PASSED / {failed} FAILED"
    )
    print("=" * 60)
    print()


if __name__ == "__main__":

    run_all_tests()