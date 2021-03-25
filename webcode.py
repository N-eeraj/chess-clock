from flask import *
import numpy as np
import pandas as pd

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/vote', methods=['post'])
def vote():
    candidate_list = pd.read_csv('static/candidate_list.csv', index_col=0)
    votes = pd.read_csv('static/votes.csv', index_col=0)
    #print(candidate_list)
    #print(votes)
    num = int(request.form['slno'])
    if num not in candidate_list.index:
        print('Error')
        return '''<script>alert('Vote Failed Invalid Serial Number');window.location='/'</script>'''
    party = candidate_list.loc[num].Party
    votes.loc[party]+=1
    votes.to_csv('static/votes.csv')
    print('Success')
    return '''<script>alert('Vote Successful');window.location='/'</script>'''

@app.route('/results')
def results():
    df = pd.read_csv('static/votes.csv')
    s = df.to_numpy()
    return render_template('result.html', val=s)

@app.route('/reset')
def reset():
    votes = pd.read_csv('static/votes.csv', index_col=0)
    votes = votes.assign(Votes=0)
    votes.to_csv('static/votes.csv')
    return '''<script>alert('Votes Reset');window.location='/results'</script>'''

if  __name__=='__main__':
    app.run(debug=True)
