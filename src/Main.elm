module Main exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Cool exposing (alert)


view : () -> Html msg
view () =
    div [ class "jumbotron" ]
        [ h1 [] [ text "Welcome Ash Ketchum!" ]
        , p [ onClick (alert "Cool" )]
            [ text <|
                """ 
                You and Pikachu finally made it! 🥇
                """
            , text (print (String.fromInt (1 + 2)))
            ]
        ]


main =
    view ()
