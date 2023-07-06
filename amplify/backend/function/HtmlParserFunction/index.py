import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

def extract_text_from_web_page(url, id=None, classname=None, time_to_load=5):
    """
    This function takes an URL and using Selenium abd BS4 we load it and obtain the text.
    We can pass the optional id or classname to obtain only the text of the specified element
    :param url: The URL of the page to load
    :param id: The id of the element to extract
    :param classname: The classname of the element to extract
    :param time_to_load: The time to wait for the page to load
    :return: The text of the element or None if the element was not found.
    :rtype: str or None
    :Example:
    >>> extract_text_from_web_page("https://www.example.com")
    >>> extract_text_from_web_page("https://www.example.com", id="content")
    >>> extract_text_from_web_page("https://www.example.com", classname="content")
    >>> extract_text_from_web_page("https://www.example.com", id="content", time_to_load=10)
    """
    if id and classname:
        raise ValueError("Only either the 'id' or 'classname' parameter should be provided, not both.")

    # Set Chrome options to enable JavaScript in case it is needed
    chrome_options = Options()
    chrome_options.add_argument("--enable-javascript")
    # Create a new instance of the Chrome driver with desired capabilities
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)
    # We wait for the page to load entirely
    time.sleep(time_to_load)  
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    if id:
        element = soup.find(id=id)
    elif classname:
        element = soup.find(class_=classname)
    else:
        element = soup

    if element:
        text = element.get_text()
        return text

    return None

def separate_paragraphs(text):
    # Split the text into paragraphs based on '</p>' tag
    paragraphs = text.split('\n\n')
    
    # Remove any leading or trailing spaces from each paragraph
    paragraphs = [paragraph.strip() for paragraph in paragraphs]
    
    for p in paragraphs:
        print(f"--------------{len(paragraphs)}-----------------")
        print(p)
    return paragraphs

web_url = "https://catalog.workshops.aws/msft-costopt/en-US/wec2/right-instance"
element_class = "MarkdownRenderer-module_markdown__35_09"

text = extract_text_from_web_page(web_url, classname=element_class)
print("\n" + text)

print("\n###############################\n")
separate_paragraphs(text)
