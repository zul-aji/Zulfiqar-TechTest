from config import WEB_URL
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

options = Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

driver.get(WEB_URL)
driver.maximize_window()

# Wait until the "List" button is present and clickable
wait = WebDriverWait(driver, 10)
list_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'List')]")))

# Click the "List" button
list_button.click()

# Wait until the user list is present
wait.until(EC.presence_of_element_located((By.CLASS_NAME, "editButton")))

# Find the span with the name containing "Budi"
user_spans = driver.find_elements(By.XPATH, "//div[@class='userItem']/span")
budi_found = False
for span in user_spans:
    if "Budi" in span.text:
        # Find the corresponding edit button
        parent_div = span.find_element(By.XPATH, "..")
        edit_button = parent_div.find_element(By.CLASS_NAME, "editButton")
        edit_button.click()
        budi_found = True
        break

if not budi_found:
    print("No user with the name containing 'Budi' found")
else:
    # Wait for the form to load
    wait.until(EC.presence_of_element_located((By.NAME, "nama")))

    # Wait until the input field named "nama" contains the word "Budi"
    WebDriverWait(driver, 10).until(
        lambda driver: "Budi" in driver.find_element(By.NAME, "nama").get_attribute('value')
    )

    # Change the value in the input field named "nama" to "Budiono Siregar"
    nama_input = driver.find_element(By.NAME, "nama")
    nama_input.clear()
    nama_input.send_keys("Budiono Siregar")

    submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    submit_button.click()

    # Wait for the AlertModal dialog to appear
    try:
        time.sleep(1)
        wait.until(EC.visibility_of_element_located((By.NAME, "successDialog")))
        success_dialog = driver.find_element(By.NAME, "message").text
        print(f"User updated successfully. Message: {success_dialog}")
        close_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'close')]")))
        close_button.click()
    except:
        try:
            time.sleep(1)
            wait.until(EC.visibility_of_element_located((By.NAME, "failedDialog")))
            failure_dialog = driver.find_element(By.NAME, "message").text
            print(f"User failed to update. Message: {failure_dialog}")
            close_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'close')]")))
            close_button.click()
        except Exception as e:
            time.sleep(1)
            print(f"Form submission status is unclear. No clear success or fail message found. Exception: {str(e)}")

# driver.quit()
