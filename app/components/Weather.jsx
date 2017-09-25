var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
    getInitialState: function() {
      return {
          isLoading: false,
          error: false
      };
    },

    handleSearch: function(location) {
        var that = this;

        that.setState({isLoading: true});

        openWeatherMap.getTemp(location).then(function(temp) {
            that.setState({
                isLoading: false,
                error: false,
                errorMessage: '',
                location: location,
                temp: temp
            });
        }, function(err) {
            that.setState({
                isLoading: false,
                error: true,
                errorMessage: err.message,
                location: location,
                temp: 0
            });
        });
    },

    render: function() {
        const {isLoading, location, temp, error, errorMessage} = this.state;
        function renderMessage() {
            if (isLoading) {
                return <h3>Fetching weather ...</h3>;
            } else if (error) {
                return <h3>Error fetching weather for {location} </h3>;
            } else if (temp && location) {
                return <WeatherMessage location={location} temp={temp} />;
            }
        }

        return (
            <div>
                <h1>Weather Component</h1>
                <WeatherForm onSearch={this.handleSearch} />
                {renderMessage()}
            </div>
        );
    }
});

module.exports = Weather;
