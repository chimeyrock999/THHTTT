from flask import Flask
from flask import request
from flask import jsonify
import vnquant.data as dt
import pandas as pd
import pymongo


from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET'])
def FetchData():
    r = request.args
    # print(list(r.lists()))
    code = r["code"]
    start_date = r["start_date"]
    end_date = r["end_date"]
    loader = dt.DataLoader(code, start_date, end_date, minimal=False)
    data = loader.download()
    data.columns = ['change_perc1', 'change_perc2', 'open', 'high', 'low', 'close',
                    'volume_match', 'volume_reconcile', 'adjust', 'value_match', 'value_reconcile', 'volume']
    data.reset_index(inplace=True)
    data = data.rename(columns={'index': 'date'})
    return jsonify(data={
        'symbol': code,
        'data': data.to_dict('records')})
    # return "hello"


@app.route("/predict/", methods=['GET'])
def GetPredict():
    r = request.args
    code = r["code"]
    client = pymongo.MongoClient(
        "mongodb+srv://messithanh2k:messithanh2k@qlht.kpuwx.mongodb.net/?retryWrites=true&w=majority")
    target_db = client["StockPrice"]
    collection = target_db[code]
    res = {
        'symbol': code,
        'data': list(collection.find({}, {"_id": 0, "date": 1, "Actual Price": 1, "Predicted Price": 1}))
    }
    print(list(collection.find({}, {"_id":0, "date": 1, "Actual Price": 1, "Predicted Price": 1})))
    return {"data": res}


if __name__ == "__main__":
    app.run(debug=True)
