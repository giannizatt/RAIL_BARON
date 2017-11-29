import pandas as pd

def get_turin_mean():
    data = pd.read_csv('dataset/speedtest_short.csv')
    df = data[data['CLIENT_CITY']=='Turin']
    return df['DOWNLOAD_KBPS'].mean(), df['UPLOAD_KBPS'].mean()

