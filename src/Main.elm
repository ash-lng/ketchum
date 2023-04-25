module Main exposing (main, update)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Cool exposing (alert)
import Http

type Msg = Alert String

update : Msg -> Int -> ( Int, Cmd Msg )
update msg i =
    case msg of
        Alert message ->
            (i + 1, alert message)

view : Int -> Html Msg
view i =
    div [ class "jumbotron" ]
        [ h1 [] [ text "Welcome Ash Ketchum!" ]
        , p [ onClick (Alert "Cool" )]
            [ text <|
                """ 
                You and Pikachu finally made it! 🥇
                """
            , text (String.fromInt (1 + i))
            ]
        ]


main : Program () Int Msg
main =
    Browser.element
        { view = view
        , init = \() -> (0, Cmd.none)
        , update = update
        , subscriptions = (\model -> Sub.none)
        }
