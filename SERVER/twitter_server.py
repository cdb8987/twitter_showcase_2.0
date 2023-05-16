from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask import request
from datetime import date
import requests
import json
from flask_cors import CORS
import os



def create_app():

    app = Flask(__name__, static_folder='../CLIENT/twitter_showcase_2.0/build', static_url_path='/')
    CORS(app)
    # added 3 arguments into the flask instance creation
    #

    @app.route("/")
    def index():
        return send_from_directory('../CLIENT/twitter_showcase_2.0/build', 'index.html')

    @app.route("/usertweets")
    def user_tweets():
        try:
            a = request.args.get('username')
            username = a  # redefining this after request so that if request breaks this line does not execute and username remains default
            print('query updated username to', username)
        except:
            print('query was not updated and is', username)

        url = f'https://api.twitter.com/2/tweets/search/recent?query=from:{username}%20-is:retweet%20-is:quote%20-is:reply&tweet.fields=created_at,author_id,public_metrics&expansions=attachments.media_keys,author_id&media.fields=url,preview_image_url&user.fields=profile_image_url'

        payload = {}
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': f'Bearer AAAAAAAAAAAAAAAAAAAAAIIchQEAAAAAKC3tUXr5%2FvyR0vHg5jdgZBsX0yY%3D3nsyykRRtBUNd9ulu9hWNcbhImhTCCntzhjgp9b3NPwVPmGPrS',
            'Cookie': 'guest_id=v1%3A167858240399952206; guest_id_ads=v1%3A167858240399952206; guest_id_marketing=v1%3A167858240399952206; personalization_id="v1_zp9GphfdVXRQbjHOMkji3A=="'
        }

        response = requests.request("GET", url, headers=headers, data=payload)

        print(response.text)
        tweet_JSON = response.json()
        print(tweet_JSON)

        try:
            html_string = ''
            for i in parse_tweets(tweet_JSON):
                html_string += f'<p>{i}</p>'
            # return html_string
            return parse_tweets(tweet_JSON)

        except:
            return f'<h1>THAT USER DOESNT EXIST !!!</h1>'

    @app.route("/topictweets")
    def topic_tweets():
        topic_string = request.args.get('searchstring')

        url = f'https://api.twitter.com/2/tweets/search/recent?query={topic_string}&tweet.fields=created_at,author_id,public_metrics&expansions=attachments.media_keys,author_id&media.fields=url,preview_image_url&user.fields=profile_image_url'

        payload = {}
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAIIchQEAAAAAKC3tUXr5%2FvyR0vHg5jdgZBsX0yY%3D3nsyykRRtBUNd9ulu9hWNcbhImhTCCntzhjgp9b3NPwVPmGPrS',
            'Cookie': 'guest_id=v1%3A167858240399952206; guest_id_ads=v1%3A167858240399952206; guest_id_marketing=v1%3A167858240399952206; personalization_id="v1_zp9GphfdVXRQbjHOMkji3A=="'
        }

        response = requests.request("GET", url, headers=headers, data=payload)
        tweet_JSON = response.json()
        # return f'<p>{parse_tweets(tweet_JSON)}</p>'
        return parse_tweets(tweet_JSON)

    def local_env_user_tweets(username):

        url = f'https://api.twitter.com/2/tweets/search/recent?query=from:{username}%20-is:retweet%20-is:quote%20-is:reply&tweet.fields=created_at,author_id,public_metrics&expansions=attachments.media_keys,author_id&media.fields=url,preview_image_url&user.fields=profile_image_url'

        payload = {}
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAIIchQEAAAAAKC3tUXr5%2FvyR0vHg5jdgZBsX0yY%3D3nsyykRRtBUNd9ulu9hWNcbhImhTCCntzhjgp9b3NPwVPmGPrS',
            'Cookie': 'guest_id=v1%3A167858240399952206; guest_id_ads=v1%3A167858240399952206; guest_id_marketing=v1%3A167858240399952206; personalization_id="v1_zp9GphfdVXRQbjHOMkji3A=="'
        }

        response = requests.request("GET", url, headers=headers, data=payload)

        # print(response.text)
        tweet_JSON = response.json()
        print(parse_tweets(tweet_JSON))

        return f'<h1>Here are 10 tweets from that user!{response.text}</h1>'

    def parse_tweets(response):
        ''' takes api response (JSON) as parameter.    1) individual tweet object from within 'data' key in API response and 2) includes object from API response'''
        parsed_tweet_list = []
        print(type(response), response, '/n/n/n')
        for i in response['data']:
            parsed_tweet = {
                'tweet_id': i['id'],
                'author_id': i['author_id'],
                'author_profile_pic': '',
                'author_display_name': '',
                'author_user_name': '',
                'tweet_text': i['text'],
                'created_at': i['created_at'],
                'reply_count': i['public_metrics']['reply_count'],
                'retweet_count': i['public_metrics']['retweet_count'],
                'like_count': i['public_metrics']['like_count'],
                'quote_count': i['public_metrics']['quote_count'],
                'media_key': '',
                'media_url': ''
            }
            if 'attachments' in i:  # updates parsed tweet dict by iterating over url and profile_url resources
                parsed_tweet['media_key'] = i['attachments']['media_keys'][0]
                for j in response['includes']['media']:
                    if j['media_key'] == parsed_tweet['media_key']:
                        if 'url' in j:
                            parsed_tweet['media_url'] = j['url']
                        elif 'preview_image_url' in j:
                            parsed_tweet['media_url'] = j['preview_image_url']
                        else:
                            parsed_tweet['media_url'] = 'FAILED TO RETRIEVE MEDIA URL'
            for k in response['includes']['users']:
                if k['id'] == parsed_tweet['author_id']:
                    parsed_tweet['author_profile_pic'] = k['profile_image_url']
                    parsed_tweet['author_display_name'] = k['name']
                    parsed_tweet['author_user_name'] = k['username']

            parsed_tweet_list.append(parsed_tweet)
        # for i in parsed_tweet_list:
        #     print(i, '\n\n')
        return parsed_tweet_list
    return app


app = create_app()
app.run()
