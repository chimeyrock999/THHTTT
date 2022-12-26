import vnquant.data as dt
import pandas as pd
import pymongo
from datetime import datetime


client = pymongo.MongoClient("mongodb+srv://root:admin123@stockprices.vfd4flg.mongodb.net/?retryWrites=true&w=majority")

db = client['StockPrices']

stock_codes = pd.read_csv("./stock_codes.csv", header=None)
today = datetime.today().strftime('%Y-%m-%d')

for stock_code in list(stock_codes[0]):
    collection = db[stock_code]
    loader = dt.DataLoader(stock_code, '2018-01-01', today, minimal=False)
    data = loader.download()
    data.columns =['change_perc1', 'change_perc2', 'open', 'high', 'low', 'close', 'volume_match', 'volume_reconcile', 'adjust', 'value_match', 'value_reconcile', 'volume']
    data.reset_index(inplace=True)
    data = data.rename(columns = {'index':'date'})
    collection.insert_many(data.to_dict('records'))