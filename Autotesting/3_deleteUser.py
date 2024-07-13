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
        delete_button = parent_div.find_element(By.CLASS_NAME, "deleteButton")
        delete_button.click()
        budi_found = True
        print("User 'Budi' is deleted")
        break

if not budi_found:
    print("No user with the name containing 'Budi' found")

# driver.quit()
