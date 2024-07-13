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

# Wait until the "Daftar" button is present and clickable
wait = WebDriverWait(driver, 10)
daftar_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Daftar')]")))

# Click the "Daftar" button
daftar_button.click()

# Wait until the form fields are present
wait.until(EC.presence_of_element_located((By.NAME, "nama")))

# Fill in the form fields
driver.find_element(By.NAME, "nama").send_keys("Budi Siregar")
driver.find_element(By.NAME, "tempat_lahir").send_keys("Medan")
driver.find_element(By.NAME, "tanggal_lahir").send_keys("01-20-2012")
driver.find_element(By.NAME, "jenis_kelamin").send_keys("laki")
driver.find_element(By.NAME, "telepon").send_keys("0811111111")
driver.find_element(By.NAME, "whatsapp").send_keys("0811111111")
driver.find_element(By.NAME, "email").send_keys("kapal@lawd.com")

# Delay for 1 second
time.sleep(1)

# Submit the form
submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
submit_button.click()

# Wait for the AlertModal dialog to appear
try:
    time.sleep(1)
    wait.until(EC.visibility_of_element_located((By.NAME, "successDialog")))
    success_dialog = driver.find_element(By.NAME, "message").text
    print(f"Form submitted successfully. Message: {success_dialog}")
    close_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'close')]")))
    close_button.click()
except:
    try:
        time.sleep(1)
        wait.until(EC.visibility_of_element_located((By.NAME, "failedDialog")))
        failure_dialog = driver.find_element(By.NAME, "message").text
        print(f"Form submission failed. Message: {failure_dialog}")
        close_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'close')]")))
        close_button.click()
    except Exception as e:
        time.sleep(1)
        print(f"Form submission status is unclear. No clear success or fail message found. Exception: {str(e)}")

# driver.quit()
