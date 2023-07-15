from bs4 import BeautifulSoup
import random, requests, json,re

# cycle through user agents to bypass anti-bot/crawler filters
ua_list = ['Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36'
    ,'Mozilla/5.0 (Linux; Android 10; SM-G980F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.96 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36']

HEADERS = {
    'user-agent' : random.choice(ua_list),  
    'Accept-Language': 'en-US, en;q=0.5'
}

# contains urls to 10 Surveys from 2012 to 2022
url_arr = ["https://stackoverflow.blog/2012/02/10/survey-results/","https://stackoverflow.blog/2013/01/25/2012-stack-overflow-user-survey-results/",
           "https://stackoverflow.blog/2014/02/19/2013-stack-overflow-user-survey-results/",
           "https://insights.stackoverflow.com/survey/2015","https://insights.stackoverflow.com/survey/2016"
           ,"https://insights.stackoverflow.com/survey/2017","https://insights.stackoverflow.com/survey/2018",
           "https://insights.stackoverflow.com/survey/2019","https://insights.stackoverflow.com/survey/2020",
           "https://insights.stackoverflow.com/survey/2021","https://survey.stackoverflow.co/2022/#most-popular-technologies-office-stack-async"]

# grabs 2015
url = url_arr[3] 

page = requests.get(url, headers = HEADERS) 

if page.status_code != 200:
    print('Fail to retrieve page.')   
else:
    print('Retrieved page succesfully.')

soup = BeautifulSoup(page.content, "lxml")  

# From 2015 onwards they asked participants for most loved and dreaded technologies, let's scrape it
#so far I have only scraped 2015, I plan to scrape the remaining 7 and hope the following code can be placed in functions and reused if the graphs on the website are the same HTML

dreaded_graph = soup.find(id = "techSuper-dreaded")
dreaded_items = ["super-salesforce","super-basic","super-wordpress","super-matlab","super-sharepoint","super-lamp","super-perl","super-cordova","super-coffeescript","super-other"]

loved_graph = soup.find(id = "techSuper-loved")

loved_items = ["super-swift","super-cplusplus11","super-rust","super-go","super-clojure","super-scala","super-fsharp","super-haskell","super-csharp","super-python"]
#clean_items = [re.sub('super-', '', item) for item in loved_items]

loved_dict = {} 
for item in loved_items: 
    li = loved_graph.find(class_ = item)
    clean_name = re.sub('super-','',item)

    stat = li.find('span').text
    clean_stat = re.sub('%', '', stat)
    clean_float_stat = float(clean_stat)

    loved_dict[clean_name] = clean_float_stat

print(loved_dict)
    
dreaded_dict = {}
for item in dreaded_items: 
    li = dreaded_graph.find(class_ = item)
    clean_name = re.sub('super-','',item)

    stat = li.find('span').text
    clean_stat = re.sub('%', '', stat)
    clean_float_stat = float(clean_stat)

    dreaded_dict[clean_name] = clean_float_stat

print(dreaded_dict)

